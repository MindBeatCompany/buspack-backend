import { Test, TestingModule } from '@nestjs/testing';
import { EnabledPlacesController } from './enabled-places.controller';

describe('EnabledPlacesController', () => {
  let controller: EnabledPlacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnabledPlacesController],
    }).compile();

    controller = module.get<EnabledPlacesController>(EnabledPlacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
