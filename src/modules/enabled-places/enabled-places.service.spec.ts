import { Test, TestingModule } from '@nestjs/testing';
import { EnabledPlacesService } from './enabled-places.service';

describe('EnabledPlacesService', () => {
  let provider: EnabledPlacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnabledPlacesService],
    }).compile();

    provider = module.get<EnabledPlacesService>(EnabledPlacesService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
