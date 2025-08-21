package com.system.payments.repositories;

import com.system.payments.entities.Pago;
import com.system.payments.enums.PagoStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PagoRepository extends JpaRepository<Pago, Long> {

    List<Pago> findByEstudianteCodigo(String codigo);

    List<Pago> findByStatus(PagoStatus status);
}
