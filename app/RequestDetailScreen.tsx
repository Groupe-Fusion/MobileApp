// import React, { useEffect, useState } from 'react';
// import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import { useRoute, useRouter } from 'expo-router';
// import axios from 'axios';
// import { Ionicons } from '@expo/vector-icons';

// const PRIMARY = '#4A90E2';
// const TEXT_PRIMARY = '#1F2937';
// const TEXT_SECONDARY = '#4B5563';

// export default function RequestDetailScreen() {
//   const route = useRoute();
//   const router = useRouter();
//   const { id } = (route.params as any);

//   const [reservation, setReservation] = useState<any>(null);
//   const [tracking, setTracking] = useState<{ latitude: number; longitude: number } | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch reservation details
//   useEffect(() => {
//     axios.get(`http://57.128.212.12:8079/reservations/${id}`)
//       .then(({ data }) => setReservation(data))
//       .catch(() => setError('Impossible de récupérer les détails'))
//       .finally(() => setLoading(false));
//   }, [id]);

//   // Poll for real-time location every 5 seconds
//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (reservation) {
//       const fetchPosition = () => {
//         axios.get(`http://57.128.212.12:8079/reservations/${id}/tracking`)
//           .then(({ data }) => setTracking({ latitude: data.lat, longitude: data.lng }))
//           .catch(() => {});
//       };
//       fetchPosition();
//       timer = setInterval(fetchPosition, 5000);
//     }
//     return () => timer && clearInterval(timer);
//   }, [reservation, id]);

//   if (loading) {
//     return <View style={styles.center}><ActivityIndicator size="large" /></View>;
//   }
//   if (error || !reservation) {
//     return <View style={styles.center}><Text style={{ color: 'red' }}>{error || 'Erreur inconnue'}</Text></View>;
//   }

//   const { recipientName, recipientAddress, recipientCity, recipientPostalCode, reservationStatus, deliveryDate } = reservation;
//   const formattedDate = deliveryDate ? new Date(deliveryDate).toLocaleString('fr-FR') : '—';

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Pressable onPress={() => router.back()} style={styles.backBtn}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </Pressable>
//         <Text style={styles.headerTitle}>Détail de la demande</Text>
//       </View>

//       <View style={styles.infoSection}>
//         <Text style={styles.label}>Destinataire</Text>
//         <Text style={styles.value}>{recipientName}</Text>
//         <Text style={styles.value}>{`${recipientAddress}, ${recipientPostalCode} ${recipientCity}`}</Text>

//         <Text style={styles.label}>Statut</Text>
//         <Text style={[styles.status, { color: statusColor(reservationStatus) }]}>{reservationStatus}</Text>

//         <Text style={styles.label}>Date de livraison</Text>
//         <Text style={styles.value}>{formattedDate}</Text>
//       </View>

//       <View style={styles.mapContainer}>
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: tracking?.latitude || 48.8566,
//             longitude: tracking?.longitude || 2.3522,
//             latitudeDelta: 0.05,
//             longitudeDelta: 0.05,
//           }}
//         >
//           {tracking && <Marker coordinate={tracking} title="Livreur" />}
//           {reservation.startLocationCoords && reservation.endLocationCoords && (
//             <Polyline
//               coordinates={[reservation.startLocationCoords, reservation.endLocationCoords]}
//               strokeWidth={4}
//               strokeColor={PRIMARY}
//             />
//           )}
//         </MapView>
//       </View>
//     </SafeAreaView>
//   );
// }

// function statusColor(status: string) {
//   switch (status) {
//     case 'EnAttente': return '#F59E0B';
//     case 'EnCours': return '#34D399';
//     case 'Terminé': return '#6B7280';
//     case 'Annulé': return '#EF4444';
//     default: return TEXT_SECONDARY;
//   }
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F2F6FA' },
//   center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   header: { flexDirection: 'row', alignItems: 'center', backgroundColor: PRIMARY, padding: 16 },
//   backBtn: { padding: 4 },
//   headerTitle: { flex: 1, color: '#fff', fontSize: 18, fontWeight: '700', textAlign: 'center' },
//   infoSection: { padding: 16, backgroundColor: '#fff' , marginBottom: 16},
//   label: { fontSize: 14, fontWeight: '600', color: TEXT_SECONDARY, marginTop: 12 },
//   value: { fontSize: 16, color: TEXT_PRIMARY, marginTop: 4 },
//   status: { fontSize: 16, fontWeight: '600', marginTop: 4 },
//   mapContainer: { flex: 1, margin: 16, borderRadius: 12, overflow: 'hidden' },
//   map: { flex: 1 }
// });
