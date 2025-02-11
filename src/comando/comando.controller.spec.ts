import { Test, TestingModule } from '@nestjs/testing';
import { ComandoController } from './comando.controller';

describe('ComandoController', () => {
  let controller: ComandoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComandoController],
    }).compile();

    controller = module.get<ComandoController>(ComandoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
