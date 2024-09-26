package com.sjprogramming.restapi.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sjprogramming.restapi.model.Demande;

@Repository
public interface DemandeRepository extends JpaRepository<Demande, Long> {
    List<Demande> findByEleveId(Long eleveId);

}
