import AppDataSource from '../../ormconfig';
import { Client } from '../clients/client.entity';
import { Case } from '../cases/case.entity';
import { CaseStage } from '../cases/case-stage.enum';

async function seed() {
  await AppDataSource.initialize();
  const clientRepo = AppDataSource.getRepository(Client);
  const caseRepo = AppDataSource.getRepository(Case);

  const ws = 'demo-ws-1';

  const c1 = clientRepo.create({ workspaceId: ws, name: 'Cliente PF', type: 'PF', cpfCnpj: '11111111111' });
  const c2 = clientRepo.create({ workspaceId: ws, name: 'Cliente PJ', type: 'PJ', cpfCnpj: '22222222222' });
  await clientRepo.save([c1, c2]);

  const cs = [
    caseRepo.create({ workspaceId: ws, clientId: c1.id, number: '1001', stage: CaseStage.PRE_CONTRATO }),
    caseRepo.create({ workspaceId: ws, clientId: c2.id, number: '1002', stage: CaseStage.PRE_CONTRATO }),
    caseRepo.create({ workspaceId: ws, clientId: c1.id, number: '1003', stage: CaseStage.CONTRATO_ASSINADO }),
  ];
  await caseRepo.save(cs);

  console.log('Seed finished');
  await AppDataSource.destroy();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
