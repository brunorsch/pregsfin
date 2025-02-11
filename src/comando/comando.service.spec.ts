import { Test, TestingModule } from '@nestjs/testing';
import { ComandoService } from './comando.service';

describe('ComandoService', () => {
  let service: ComandoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComandoService],
    }).compile();

    service = module.get<ComandoService>(ComandoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
