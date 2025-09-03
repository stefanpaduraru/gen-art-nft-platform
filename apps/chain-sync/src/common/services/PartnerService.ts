import { PartnerRepository } from '@common/repositories/PartnerRepository';
import { MINTORIA_ID } from '@config/config';

class PartnerServiceImpl {
  public async getPartners() {
    return PartnerRepository.findAll([
      ['partner.contract', 'contract'],
    ]);
  }

  public async getPartnerByContractAddress(address: string) {
    return PartnerRepository.findOneWhere(
      'LOWER(contract.address) = :address',
      { address: address.toLowerCase() },
      [['partner.contract', 'contract']],
    );
  }

  public async getMintoriaPartner() {
    return PartnerRepository.findById(MINTORIA_ID);
  }
}

const PartnerService = new PartnerServiceImpl();
export default PartnerService;
