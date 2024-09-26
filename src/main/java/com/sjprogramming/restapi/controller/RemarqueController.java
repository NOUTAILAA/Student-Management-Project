package com.sjprogramming.restapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sjprogramming.restapi.model.Remarque;
import com.sjprogramming.restapi.model.ResourceNotFoundException;
import com.sjprogramming.restapi.repository.RemarqueRepository;

import java.util.List;

@RestController
@RequestMapping("/api/remarques")
public class RemarqueController {

    @Autowired
    private RemarqueRepository remarqueRepository;

    @GetMapping
    public List<Remarque> getAllRemarques() {
        return remarqueRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Remarque> getRemarqueById(@PathVariable Long id) {
        Remarque remarque = remarqueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Remarque not found with id: " + id));
        return ResponseEntity.ok(remarque);
    }

    @PostMapping
    public Remarque createRemarque(@RequestBody Remarque remarque) {
        return remarqueRepository.save(remarque);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Remarque> updateRemarque(@PathVariable Long id, @RequestBody Remarque remarqueDetails) {
        Remarque remarque = remarqueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Remarque not found with id: " + id));

        remarque.setContent(remarqueDetails.getContent());
        remarque.setDate(remarqueDetails.getDate());

        Remarque updatedRemarque = remarqueRepository.save(remarque);
        return ResponseEntity.ok(updatedRemarque);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRemarque(@PathVariable Long id) {
        Remarque remarque = remarqueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Remarque not found with id: " + id));

        remarqueRepository.delete(remarque);
        return ResponseEntity.noContent().build();
    }
}
