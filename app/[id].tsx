import { Product } from "@/constants/product";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductScreen() {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching product:", err);
                setLoading(false);
            });
    }, [id]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View style={{ padding: 10 }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={{ fontWeight: '600', color: '#171717' }}>Back</Text>
                    </TouchableOpacity>
                    {loading ? (
                        <View style={{ marginTop: 20, height: 20, backgroundColor: '#E0E0E0', borderRadius: 5, width: '60%' }} />
                    ) : (
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ color: '#171717', fontSize: 20 }}>{product?.title}</Text>
                        </View>
                    )}
                </View>

                <View style={{ height: 350, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                    {loading ? (
                        <View style={{ width: '100%', height: '100%', backgroundColor: '#E0E0E0', borderRadius: 10 }} />
                    ) : (
                        <Image source={{ uri: product?.image }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                    )}
                </View>

                <View style={{ padding: 10, marginTop: 20, gap: 10 }}>
                    <Text>Price</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                        {loading ? (
                            <View style={{ width: 100, height: 30, backgroundColor: '#E0E0E0', borderRadius: 5 }} />
                        ) : (
                            <Text style={{ fontSize: 25, fontWeight: '600', color: '#131313' }}>
                                ${product?.price}
                            </Text>
                        )}
                        <Text>-</Text>
                        {loading ? (
                            <View style={{ width: 50, height: 20, backgroundColor: '#E0E0E0', borderRadius: 5 }} />
                        ) : (
                            <Text style={{ fontSize: 17, opacity: 0.7 }}>
                                {product?.rating?.rate}/5 ratings
                            </Text>
                        )}
                    </View>
                </View>

                {loading ? (
                    <View style={{ opacity: 0.7, padding: 10, height: 50, backgroundColor: '#E0E0E0', borderRadius: 5 }} />
                ) : (
                    <Text style={{ opacity: 0.7, fontSize: 13, padding: 10 }}>
                        {product?.description.slice(0, 100)}...
                    </Text>
                )}
            </ScrollView>

            <View style={{ padding: 10, gap: 5, flexDirection: 'row', position: 'absolute', backgroundColor: 'white', bottom: 30, width: '100%' }}>
                <TouchableOpacity style={{ padding: 20, flex: 1, borderWidth: 1, borderColor: '#CDCDCD', borderRadius: 15, justifyContent: 'center', opacity: loading ? 0.5 : 1 }} disabled={loading}>
                    <Text style={{ textAlign: 'center' }}>Buy now</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 20, backgroundColor: '#171717', borderRadius: 15, justifyContent: 'center', opacity: loading ? 0.5 : 1 }} disabled={loading}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>Add to cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
