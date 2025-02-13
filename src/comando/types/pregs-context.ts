import { Context, SessionFlavor } from 'grammy';

interface DadosSessao {
  descricaoUltimaDespesa?: string;
  isAguarandoValorDespesa?: boolean;
}

export type PregsContext = Context & SessionFlavor<DadosSessao>;
