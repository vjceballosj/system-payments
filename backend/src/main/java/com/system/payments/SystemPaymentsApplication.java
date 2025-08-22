package com.system.payments;

import com.system.payments.entities.Estudiante;
import com.system.payments.entities.Pago;
import com.system.payments.enums.PagoStatus;
import com.system.payments.enums.TypePago;
import com.system.payments.repositories.EstudianteRepository;
import com.system.payments.repositories.PagoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Random;
import java.util.UUID;

@SpringBootApplication
public class SystemPaymentsApplication {

	public static void main(String[] args) {
		SpringApplication.run(SystemPaymentsApplication.class, args);
	}

    @Bean
    CommandLineRunner commandLineRunner(EstudianteRepository estudianteRepository, PagoRepository pagoRepository){
        return args -> {
            estudianteRepository.save(Estudiante.builder()
                    .id(UUID.randomUUID().toString())
                    .nombres("Valentín")
                    .apellidos("Ceballos")
                    .codigo("123456")
                    .programaId("LTA1")
                    .build());

            estudianteRepository.save(Estudiante.builder()
                    .id(UUID.randomUUID().toString())
                    .nombres("Danitza")
                    .apellidos("Vergara")
                    .codigo("123451")
                    .programaId("LTA2")
                    .build());

            estudianteRepository.save(Estudiante.builder()
                    .id(UUID.randomUUID().toString())
                    .nombres("Izell")
                    .apellidos("Ceballos")
                    .codigo("123452")
                    .programaId("LTA1")
                    .build());

            estudianteRepository.save(Estudiante.builder()
                    .id(UUID.randomUUID().toString())
                    .nombres("Samuel")
                    .apellidos("Ceballos")
                    .codigo("123453")
                    .programaId("LTA1")
                    .build());

            estudianteRepository.save(Estudiante.builder()
                    .id(UUID.randomUUID().toString())
                    .nombres("Lula")
                    .apellidos("Ceballos")
                    .codigo("123454")
                    .programaId("LTA2")
                    .build());

            TypePago tiposPago[] = TypePago.values();
            Random random = new Random();

            estudianteRepository.findAll().forEach(estudiante -> {
                for (int i = 0; i<5; i++){
                    int index = random.nextInt(tiposPago.length);
                    Pago pago = Pago.builder()
                   .cantidad(1000 + (int) (Math.random() * 20000))
                   .type(tiposPago[index])
                   .status(PagoStatus.CREADO)
                   .fecha(LocalDate.now())
                   .estudiante(estudiante)
                   .build();
                pagoRepository.save(pago);
                }
            });
        };
    }
}
