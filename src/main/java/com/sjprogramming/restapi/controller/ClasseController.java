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

import com.sjprogramming.restapi.model.Classe;
import com.sjprogramming.restapi.model.Eleve;
import com.sjprogramming.restapi.model.ResourceNotFoundException;
import com.sjprogramming.restapi.repository.ClasseRepository;
import com.sjprogramming.restapi.repository.EleveRepository;

@RestController
@RequestMapping("/api/classes")
public class ClasseController {

    @Autowired
    private ClasseRepository classeRepository;
    private EleveRepository eleveRepository;

    @GetMapping
    public List<Classe> getAllClasses() {
        return classeRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Classe> getClasseById(@PathVariable Long id) {
        Classe classe = classeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Classe not found with id :" + id));
        return ResponseEntity.ok(classe);
    }

    @PostMapping
    public Classe createClasse(@RequestBody Classe classe) {
        return classeRepository.save(classe);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Classe> updateClasse(@PathVariable Long id, @RequestBody Classe classeDetails) {
        Classe classe = classeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Classe not found with id :" + id));

        classe.setName(classeDetails.getName());
        classe.setDescription(classeDetails.getDescription());

        Classe updatedClasse = classeRepository.save(classe);
        return ResponseEntity.ok(updatedClasse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClasse(@PathVariable Long id) {
        Classe classe = classeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Classe not found with id :" + id));

        classeRepository.delete(classe);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/{classeId}/assign/{eleveId}")
    public ResponseEntity<Void> assignClasseToEleve(@PathVariable Long classeId, @PathVariable Long eleveId) {
        Classe classe = classeRepository.findById(classeId)
                .orElseThrow(() -> new ResourceNotFoundException("Classe not found with id :" + classeId));
        Eleve eleve = eleveRepository.findById(eleveId)
                .orElseThrow(() -> new ResourceNotFoundException("Eleve not found with id :" + eleveId));

        eleve.setClasse(classe);
        eleveRepository.save(eleve);
        return ResponseEntity.noContent().build();
    }

}
