import { Test, TestingModule } from '@nestjs/testing';
import { ProcessoService } from './processo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Processo } from './processo.entity';

describe('ProcessoService', () => {
  let service: ProcessoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessoService,
        {
          provide: getRepositoryToken(Processo),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ProcessoService>(ProcessoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
