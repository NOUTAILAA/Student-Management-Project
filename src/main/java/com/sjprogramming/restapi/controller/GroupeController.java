package com.sjprogramming.restapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sjprogramming.restapi.model.Groupe;
import com.sjprogramming.restapi.model.ResourceNotFoundException;
import com.sjprogramming.restapi.repository.GroupeRepository;

@RestController
@RequestMapping("/api/groupes")
public class GroupeController {

    @Autowired
    private GroupeRepository groupeRepository;

    @GetMapping
    public List<Groupe> getAllGroupes() {
        return groupeRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Groupe> getGroupeById(@PathVariable Long id) {
        Groupe groupe = groupeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Groupe not found with id :" + id));
        return ResponseEntity.ok(groupe);
    }

    @PostMapping
    public Groupe createGroupe(@RequestBody Groupe groupe) {
        return groupeRepository.save(groupe);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Groupe> updateGroupe(@PathVariable Long id, @RequestBody Groupe groupeDetails) {
        Groupe groupe = groupeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Groupe not found with id :" + id));

        groupe.setName(groupeDetails.getName());
        groupe.setDescription(groupeDetails.getDescription());

        Groupe updatedGroupe = groupeRepository.save(groupe);
        return ResponseEntity.ok(updatedGroupe);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroupe(@PathVariable Long id) {
        Groupe groupe = groupeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Groupe not found with id :" + id));

        groupeRepository.delete(groupe);
        return ResponseEntity.noContent().build();
    }
}
