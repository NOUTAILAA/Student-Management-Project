package com.sjprogramming.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sjprogramming.restapi.model.Classe;

public interface ClasseRepository extends JpaRepository<Classe, Long> {
}