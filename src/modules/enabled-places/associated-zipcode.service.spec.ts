import { Test, TestingModule } from '@nestjs/testing';
import { AssociatedZipcodeService } from './associated-zipcode.service';

describe('AssociatedZipcodeService', () => {
  let service: AssociatedZipcodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssociatedZipcodeService],
    }).compile();

    service = module.get<AssociatedZipcodeService>(AssociatedZipcodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
