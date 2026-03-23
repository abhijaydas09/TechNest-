package com.example.tecknest.repository;


import com.example.tecknest.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("""
        SELECT p FROM Product p
        WHERE (:category IS NULL OR p.category = :category)
        AND   (:brand    IS NULL OR p.brand    = :brand)
        AND   (:minPrice IS NULL OR p.price   >= :minPrice)
        AND   (:maxPrice IS NULL OR p.price   <= :maxPrice)
    """)
    Page<Product> findWithFilters(
            @Param("category") String category,
            @Param("brand")    String brand,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            Pageable pageable
    );
}