import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const tags = [
  { name: 'comandos', description: 'Processamento de comandos do chatbot' },
  { name: 'usuarios', description: 'Manutenção dos cadastros de usuários' },
];


export function gerarDocumentFactory(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('PregsFin')
    .setDescription(
      'APIs para o PregsFin, utilizado tanto para a criação do chatbot como para integrações e paineis administrativos.',
    )
    .setVersion('1.0');

  tags.forEach((tag) => config.addTag(tag.name, tag.description));

  const builtConfig = config.build();

  return () => SwaggerModule.createDocument(app, builtConfig);
}
