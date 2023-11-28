import { NestFactory } from '@nestjs/core';
import { StudentsModule } from './students.module';

async function bootstrap() {
  const app = await NestFactory.create(StudentsModule);
  await app.listen(3000);
}
bootstrap();
