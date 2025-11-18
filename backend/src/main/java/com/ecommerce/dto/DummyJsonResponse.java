package com.ecommerce.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DummyJsonResponse {
    private List<DummyJsonProduct> products;
    private Integer total;
    private Integer skip;
    private Integer limit;

    public DummyJsonResponse() {}

    public List<DummyJsonProduct> getProducts() {
        return products;
    }

    public void setProducts(List<DummyJsonProduct> products) {
        this.products = products;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Integer getSkip() {
        return skip;
    }

    public void setSkip(Integer skip) {
        this.skip = skip;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }
}

