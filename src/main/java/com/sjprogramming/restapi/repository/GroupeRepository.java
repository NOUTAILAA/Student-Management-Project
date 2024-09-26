package com.sjprogramming.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sjprogramming.restapi.model.Groupe;

public interface GroupeRepository extends JpaRepository<Groupe, Long> {
}