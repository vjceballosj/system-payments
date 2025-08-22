package com.system.payments.entities;

import com.system.payments.enums.PagoStatus;
import com.system.payments.enums.TypePago;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;


@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "pago")
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fecha;

    private double cantidad;

    @Enumerated(EnumType.STRING)
    private TypePago type;

    @Enumerated(EnumType.STRING)
    private PagoStatus status;

    private String file;

    @ManyToOne
    @JoinColumn(name = "estudiante_id")
    private Estudiante estudiante;
}
