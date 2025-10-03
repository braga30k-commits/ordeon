// Node 18+ has global fetch
const base = 'http://localhost:3000';
const headers = { 'Content-Type': 'application/json', 'x-workspace-id': 'demo-ws-1' };

async function post(path, body) {
  const res = await fetch(base + path, { method: 'POST', headers, body: JSON.stringify(body) });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = text; }
  return { status: res.status, body: json };
}

async function get(path) {
  const res = await fetch(base + path, { method: 'GET', headers });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = text; }
  return { status: res.status, body: json };
}

async function run() {
  console.log('Creating client...');
  const c = await post('/api/clients', { name: 'Cliente PF', type: 'PF', cpfCnpj: '12345678901' });
  console.log('Client:', c.status, c.body);
  if (c.status >= 400) return;
  const clientId = c.body.id || c.body[0]?.id;

  console.log('Creating lead...');
  const lead = await post('/api/leads', { clientId, number: 'L-001' });
  console.log('Lead:', lead.status, lead.body);
  if (lead.status >= 400) return;
  const leadId = lead.body.id || lead.body[0]?.id;

  console.log('Getting leads...');
  const leads = await get('/api/leads');
  console.log('Leads:', leads.status, leads.body);

  console.log('Converting lead...');
  const conv = await post(`/api/leads/${leadId}/convert`, {});
  console.log('Convert:', conv.status, conv.body);

  console.log('Leads after convert...');
  const leads2 = await get('/api/leads');
  console.log('Leads:', leads2.status, leads2.body);

  console.log('Cases with CONTRATO_ASSINADO...');
  const cases = await get('/api/cases?stage=CONTRATO_ASSINADO');
  console.log('Cases:', cases.status, cases.body);
}

run().catch(e => { console.error(e); process.exit(1); });
