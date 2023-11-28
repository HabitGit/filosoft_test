import {NestFactory} from '@nestjs/core';
import {StudentsModule} from './students.module';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        StudentsModule,
        {
        transport: Transport.NATS,
        options: {
            servers: ['nats://192.162.246.63:4222'],
        }
    });

    await app.listen();
}

bootstrap();
