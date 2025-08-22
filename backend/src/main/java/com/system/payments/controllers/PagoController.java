package com.system.payments.controllers;

import com.system.payments.entities.Estudiante;
import com.system.payments.entities.Pago;
import com.system.payments.enums.PagoStatus;
import com.system.payments.enums.TypePago;
import com.system.payments.repositories.EstudianteRepository;
import com.system.payments.repositories.PagoRepository;
import com.system.payments.services.PagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin("*")
public class PagoController {

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private PagoRepository pagoRepository;

    @Autowired
    private PagoService pagoService;

    @GetMapping("/estudiantes")
    public List<Estudiante> listStudents(){
        return estudianteRepository.findAll();
    }

    @GetMapping("/estudiantes/{codigo}")
    public Estudiante listStudentByCodigo(@PathVariable String codigo){
        return estudianteRepository.findByCodigo(codigo);
    }

    @GetMapping("/estudiantesPorPrograma")
    public List<Estudiante> listStudentsByProgram(@RequestParam String programaId){
        return estudianteRepository.findByProgramaID(programaId);
    }

    @GetMapping("/pagos")
    public List<Pago> listPays(){
        return pagoRepository.findAll();
    }

    @GetMapping("/pagos/{id}")
    public Pago listPaysById(@PathVariable Long id){
        return pagoRepository.findById(id).get();
    }

    @GetMapping("/estudiantes/{codigo}/pagos")
    public List<Pago> listPaysByCodeStudent(@PathVariable String codigo){
        return pagoRepository.findByEstudianteCodigo(codigo);
    }

    @GetMapping("/pagosPorStatus")
    public List<Pago> listPaysByStatus(@RequestParam PagoStatus status){
        return pagoRepository.findByStatus(status);
    }

    public List<Pago> listPayByType(@RequestParam TypePago type){
        return pagoRepository.findByType(type);
    }

    @PutMapping("/pagos/{pagoId}/actualizarPago")
    public Pago updateStatusPays(@RequestParam PagoStatus status, @PathVariable Long pagoId){
        return pagoService.updatePayBySataus(status, pagoId);
    }

    @PostMapping(path = "/pagos", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Pago savePay(@RequestParam("file") MultipartFile file, double cantidad, TypePago type, LocalDate date, String codigoEstudiante) throws IOException {
        return pagoService.savePago(file, cantidad, type,date, codigoEstudiante);
    }

    @GetMapping(value = "/pagoFile/{pagoId}", produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] listFileById(@PathVariable Long pagoId) throws IOException{
        return pagoService.getFileByID(pagoId);
    }
}
