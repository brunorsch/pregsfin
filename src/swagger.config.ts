import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const tags = [
  { nome: 'comandos', descricao: 'Processamento de comandos do chatbot' },
  { nome: 'usuarios', descricao: 'Manutenção dos cadastros de usuários' },
  { nome: 'entradas', descricao: 'Registro de entradas de usuários' },
];

export function gerarDocumentFactory(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('PregsFin')
    .setDescription(
      'APIs para o PregsFin, utilizado tanto para a criação do chatbot como para integrações e paineis administrativos.',
    )
    .setVersion('1.0');

  tags.forEach((tag) => config.addTag(tag.nome, tag.descricao));

  const builtConfig = config.build();

  return () => SwaggerModule.createDocument(app, builtConfig);
}
