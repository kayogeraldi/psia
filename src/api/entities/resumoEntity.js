import PsicologoEntity from './psicologoEntity';

class ResumoEntity {
  constructor({ id, resumoAi, rpds, psicologo }) {
    this.id = id;
    this.resumoAi = resumoAi;
    this.rpds = rpds ? rpds.map((rpd) => ({ id: rpd.id })) : [];
    this.psicologo = psicologo ? new PsicologoEntity(psicologo) : null;
  }
}

export default ResumoEntity;
