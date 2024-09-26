package com.sjprogramming.restapi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sjprogramming.restapi.model.Remarque;

public interface RemarqueRepository extends JpaRepository<Remarque, Long> {
	Optional<Remarque> findById(Long id);
}