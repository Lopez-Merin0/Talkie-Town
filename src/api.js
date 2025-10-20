// api.js

let users = [
    { username: 'Vecino1', email: 'test@town.com', password: 'password123' }
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function signupUser(username, email, password) {
    await sleep(1500);

    if (users.find(u => u.email === email)) {
        return { success: false, message: 'Ese correo ya está registrado.' };
    }
    if (password.length < 6) {
        return { success: false, message: 'La contraseña debe tener al menos 6 caracteres.' };
    }

    const newUser = { username, email, password };
    users.push(newUser);
    
    console.log('Nuevo usuario registrado:', newUser);
    return { success: true, message: 'Usuario registrado con éxito.' };
}

export async function loginUser(email, password) {
    await sleep(1500);

    const user = users.find(u => u.email === email);

    if (!user) {
        return { success: false, message: 'Credenciales inválidas (usuario no encontrado).' };
    }

    if (user.password !== password) {
        return { success: false, message: 'Credenciales inválidas (contraseña incorrecta).' };
    }

    return { 
        success: true, 
        user: { username: user.username, email: user.email },
        message: 'Inicio de sesión exitoso.' 
    };
}