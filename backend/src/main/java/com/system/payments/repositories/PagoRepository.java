package com.system.payments.repositories;

import com.system.payments.entities.Pago;
import com.system.payments.enums.PagoStatus;
import com.system.payments.enums.TypePago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {

    List<Pago> findByEstudianteCodigo(String codigo);

    List<Pago> findByStatus(PagoStatus status);

    List<Pago> findByType(TypePago typePago);
}
