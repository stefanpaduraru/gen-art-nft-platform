import { ProjectTypes } from '@common/entities/Project';
import { Artist, User } from '@common/entities/User';
import { UserRepository } from '@common/repositories/UserRepository';
import TokenService from './TokenService';
import PartnerService from './PartnerService';
import Web3Token from 'web3-token';
import { toChecksumAddress } from 'ethereum-checksum-address';
import { logger } from '@common/services/Logger';
import { Errors } from '@common/integrations';
import ProjectService from './ProjectService';
import * as Bluebird from 'bluebird';
import { ProjectRepository } from '@common/repositories/ProjectRepository';
import { TokenRepository } from '@common/repositories/TokenRepository';

class UserServiceImpl {
  public async getUsers() {
    // tslint:disable-next-line: no-console
    return UserRepository.findAll([['user.partner', 'partner']]);
  }

  public async getArtists() {
    const users = await UserRepository.findManyWhere(
      'user.active = :active',
      { active: true },
      [
        ['user.partner', 'partner'],
        ['user.project', 'project'],
      ],
    );
    const artists = users.filter(
      (user) =>
        user.project &&
        user.project.length &&
        user.project.filter(
          (project) => project.type === ProjectTypes.Mainnet,
        ).length,
    );

    if (!artists) {
      return [];
    }
    await Bluebird.Promise.map(
      artists,
      (artist: User) => this.getFeaturedToken(artist),
      { concurrency: 1 },
    );

    return artists;
  }

  private async getFeaturedToken(artist: Artist) {
    const projects = await ProjectRepository.findManyWhere(
      'user.id = :userId AND project.type = :projectType',
      { userId: artist.id, projectType: ProjectTypes.Mainnet },
      [
        ['project.user', 'user'],
        ['project.contract', 'contract'],
      ],
    );
    if (!projects.length) {
      return null;
    }

    const featuredToken =
      await TokenRepository.getFeaturedTokenByProject(
        projects[projects.length - 1],
      );

    if (featuredToken) {
      featuredToken.project = projects.find(
        (project) => project.id === featuredToken.projectId,
      );
    }

    artist.project = projects;
    artist.projectCount = projects.length;
    artist.featuredToken = featuredToken;
  }

  public async getPublicUserByAddress(address: string) {
    const user = await UserRepository.findOneWhere(
      'user.address = :address',
      { address, type: ProjectTypes.Mainnet },
      [['user.partner', 'partner']],
    );

    if (!user) return;
    const tokens = await TokenService.getTokensByOwner(user.address);
    const projects = await ProjectService.getMainnetProjectsByUser(
      user.id,
    );

    return { ...user, tokens, project: projects };
  }

  public async getUserByAddress(address: string) {
    const user = await UserRepository.findOneWhere(
      'user.address = :address',
      { address },
      [],
    );

    if (!user) return;
    return user;
  }

  public async updateUser(id: number, data: Partial<User>) {
    return UserRepository.updateOne(id, data);
  }

  public async insertUserFromToken(token: string) {
    try {
      const { address } = await Web3Token.verify(token);
      const currentAddress = toChecksumAddress(address);
      const partner = await PartnerService.getMintoriaPartner();

      const user = {
        address: currentAddress,
        partner,
        name: '',
      } as User;

      const insertedUser = await UserRepository.createOne(user);
      insertedUser.partner = partner;
      return insertedUser;
    } catch (e) {
      logger.error('Error inserting new user');
      logger.error(e);
      throw new Errors.InternalServer('Error inserting new user');
    }
  }
}

const UserService = new UserServiceImpl();
export default UserService;
