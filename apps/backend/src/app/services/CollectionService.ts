import { CollectionRepository } from '@common/repositories/CollectionRepository';

class CollectionServiceImpl {
  public getSelected() {
    return CollectionRepository.findOneWhere('name = :name', {
      name: 'Selected',
    });
  }
}

const CollectionService = new CollectionServiceImpl();
export default CollectionService;
