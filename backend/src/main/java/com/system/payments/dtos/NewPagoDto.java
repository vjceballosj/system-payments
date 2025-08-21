package com.system.payments.dtos;


import com.system.payments.enums.TypePago;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewPagoDto {

    private double cantidad;
    private TypePago typePago;
    private LocalDate date;
    private String codigoEstudiante;

}
