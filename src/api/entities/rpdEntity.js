import PacienteEntity from './pacienteEntity';

class RpdEntity {
  constructor({
    id,
    dataHoraCriacao,
    dataRpd,
    titulo,
    motivos,
    sentimentos,
    pensamentosAutomaticos,
    pensamentosAdaptativos,
    reavaliacaoDoHumor,
    paciente,
  }) {
    this.id = id;
    this.dataHoraCriacao = dataHoraCriacao;
    this.dataRpd = dataRpd;
    this.titulo = titulo;
    this.motivos = motivos;
    this.sentimentos = sentimentos;
    this.pensamentosAutomaticos = pensamentosAutomaticos;
    this.pensamentosAdaptativos = pensamentosAdaptativos;
    this.reavaliacaoDoHumor = reavaliacaoDoHumor;
    this.paciente = paciente ? new PacienteEntity(paciente) : null;
  }
}

export default RpdEntity;
