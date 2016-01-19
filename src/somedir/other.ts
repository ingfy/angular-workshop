module Other {
    class Calculator {
        result = 0;
        
        add(n) { this.result += n; return this; }
        sub(n) { this.result -= n; return this; }
    }
}