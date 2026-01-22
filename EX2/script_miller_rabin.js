// Modular exponentiation
function modPower(base, exp, mod) {
    let result = 1n;
    base = base % mod;

    while (exp > 0n) {
        if (exp % 2n === 1n)
            result = (result * base) % mod;

        exp = exp / 2n;
        base = (base * base) % mod;
    }
    return result;
}

// Miller-Rabin Test
function isPrime(n, k) {
    n = BigInt(n);

    if (n <= 1n) return false;
    if (n <= 3n) return true;
    if (n % 2n === 0n) return false;

    let d = n - 1n;
    let r = 0n;

    while (d % 2n === 0n) {
        d /= 2n;
        r++;
    }

    for (let i = 0; i < k; i++) {
        let a = 2n + BigInt(Math.floor(Math.random() * Number(n - 4n)));
        let x = modPower(a, d, n);

        if (x === 1n || x === n - 1n)
            continue;

        let composite = true;

        for (let j = 0n; j < r - 1n; j++) {
            x = (x * x) % n;

            if (x === n - 1n) {
                composite = false;
                break;
            }
        }

        if (composite) return false;
    }
    return true;
}

// UI function
function checkPrime() {
    let num = document.getElementById("number").value;
    let k = parseInt(document.getElementById("iterations").value);

    if (num === "") {
        alert("Please enter a number");
        return;
    }

    let result = isPrime(num, k);

    document.getElementById("result").value =
        result ? "Probably Prime" : "Composite";
}
