package com.system.payments.services;

import com.system.payments.entities.Estudiante;
import com.system.payments.entities.Pago;
import com.system.payments.enums.PagoStatus;
import com.system.payments.enums.TypePago;
import com.system.payments.repositories.EstudianteRepository;
import com.system.payments.repositories.PagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;


@Service
@Transactional
public class PagoService {

    @Autowired
    private PagoRepository pagoRepository;

    @Autowired
    private EstudianteRepository estudianteRepository;

    public Pago savePago(MultipartFile file, double cantidad, TypePago type, LocalDate date, String codigoEstudiante) throws IOException
    {
        /*
        -Creamos una riuta donde guarda´ra el archivo
        -System.getProperty("user.home"): Obtiene la ruta del directorio personal del usuario del S.O.
            y dentro de esta ruta va crear una carpeta llamada enset-data
        -Path.get(...): Crea un objeto Path apuntando a una carpeta llamada enset/pagos dentro del directorio usuario
        */
        Path folderPath = Paths.get(System.getProperty("user.home"), "enset-data","pagos");

        if(!Files.exists(folderPath)){
            Files.createDirectories(folderPath);
        }

        String fileName = UUID.randomUUID().toString();

        //Creamos una Path para el archivo PDF que se guardará en enset/data
        Path filePath = Paths.get(System.getProperty("user.home"), "enset-data", "pagos", fileName+".pdf");

        //files.getInputStream(): Obtiene el flujo de datos recibido desde la solucitud HTTP
        //Files.copy(...): Copia los datos del archivo al destino filePtah
        Files.copy(file.getInputStream(), filePath);

        Estudiante estudiante = estudianteRepository.findByCodigo(codigoEstudiante);

        Pago pago = Pago.builder()
                .type(type)
                .status(PagoStatus.CREADO)
                .fecha(date)
                .estudiante(estudiante)
                .cantidad(cantidad)
                .file(filePath.toUri().toString())
                .build();

        return pagoRepository.save(pago);
    }

    public byte[] getFileByID(Long pagoID) throws IOException{
        Pago pago = pagoRepository.findById(pagoID).get();
        /*
        - pago.getFile(): Obtiene la URI del archivo guardado
        - URI.create(...): Convierte la cadena en un objeto URI
        - Path.of(...): Convierte el URI en un Path
        - Files.readAllBytes(...): Lee el contenido del archivo y lo devuelve como un array de bytes
         */
        return Files.readAllBytes(Path.of(URI.create(pago.getFile())));
    }

    public Pago updatePayBySataus(PagoStatus status, Long id){
        Pago pago = pagoRepository.findById(id).get();
        pago.setStatus(status);
        return pagoRepository.save(pago);
    }
}
