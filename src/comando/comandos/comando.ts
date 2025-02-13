import { PregsContext } from '../types/pregs-context';

export interface Comando {
  nomeExibicao: string;
  match(mensagem: string, ctx: PregsContext): boolean;
  executar(
    mensagem: string,
    numeroChat: string,
    ctx: PregsContext,
  ): Promise<void>;
}
