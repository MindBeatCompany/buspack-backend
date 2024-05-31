import { Test, TestingModule } from '@nestjs/testing';
import { ServicesSaitController } from './services-sait.controller';

describe('ServicesSaitController', () => {
  let controller: ServicesSaitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesSaitController],
    }).compile();

    controller = module.get<ServicesSaitController>(ServicesSaitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
