import { PartnerRepository } from '@common/repositories/PartnerRepository';

class ProjectServiceImpl {
  public getAll() {
    return PartnerRepository.findAll();
  }

  public async getPartnerDetails(id: number) {
    const partner = await PartnerRepository.findOneWhere(
      'partner.id = :id',
      { id },
      [['partner.contract', 'contract']],
    );
    if (!partner) {
      return;
    }

    return partner;
  }
}

const ProjectService = new ProjectServiceImpl();
export default ProjectService;
