import { PartnerRepository } from '@common/repositories/PartnerRepository';

class ProjectServiceImpl {
  public async getMintoriaPartner() {
    const partner = await PartnerRepository.findOneWhere(
      'partner.name = :name',
      { name: 'Mintoria' },
    );
    if (!partner) {
      return;
    }

    return partner;
  }
}

const ProjectService = new ProjectServiceImpl();
export default ProjectService;
