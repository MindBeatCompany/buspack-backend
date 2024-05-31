import { Test, TestingModule } from '@nestjs/testing';
import { ServicesSaitService } from './services-sait.service';

describe('ServicesSaitService', () => {
  let service: ServicesSaitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicesSaitService],
    }).compile();

    service = module.get<ServicesSaitService>(ServicesSaitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
