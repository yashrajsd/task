import { auth } from "@/config/firebase";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User logged in:", user);
                router.replace("/"); 
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSignIn = async () => {
        if (!email || !password) return;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successful");
        } catch (err) {
            console.log("Login error:", err);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#3E37FF" }}>
            <View style={{ flex: 1, gap: 40, backgroundColor: "#1F1F1F", justifyContent: "center", paddingHorizontal: 20 }}>
                <View style={{ gap: 30 }}>
                    <KeyboardAvoidingView>
                        <View style={{ gap: 10 }}>
                            <Text style={{ color: "white", fontWeight: "600" }}>Email address</Text>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="email"
                                style={{
                                    backgroundColor: "#2F2F2F",
                                    borderRadius: 20,
                                    padding: 20,
                                    color: "white",
                                    fontWeight: "600",
                                }}
                            />
                        </View>
                    </KeyboardAvoidingView>
                    <View style={{ gap: 10 }}>
                        <Text style={{ color: "white", fontWeight: "600" }}>Password</Text>
                        <TextInput
                            value={password}
                            onChangeText={setPassword} 
                            placeholder="password"
                            secureTextEntry={true}
                            style={{
                                backgroundColor: "#2F2F2F",
                                borderRadius: 20,
                                padding: 20,
                                color: "white",
                                fontWeight: "600",
                            }}
                        />
                    </View>
                </View>
                <TouchableOpacity style={{ borderRadius: 20, overflow: "hidden" }} onPress={handleSignIn}>
                    <Text style={{ textAlign: "center", backgroundColor: "#4943FF", padding: 20, fontWeight: "700", color: "white" }}>
                        Sign In
                    </Text>
                </TouchableOpacity>
                <View style={{ width: "100%", borderWidth: 1, borderColor: "#3B3B3B" }} />
                <TouchableOpacity onPress={() => router.replace("/sign-up")}>
                    <Text style={{ color: "white", textAlign: "center", borderWidth: 1, borderColor: "#3B3B3B", borderRadius: 20, padding: 20 }}>
                        Create a new account
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
