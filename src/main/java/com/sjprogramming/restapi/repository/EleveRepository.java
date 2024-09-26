package com.sjprogramming.restapi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sjprogramming.restapi.model.Eleve;

public interface EleveRepository extends JpaRepository<Eleve, Long> {
    Optional<Eleve> findByCinAndMdp(String cin, String mdp);
}
