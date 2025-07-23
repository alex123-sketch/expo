import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';

export default function Index() {
  const { face } = useLocalSearchParams();
  return (
    <>
      <Stack.Screen options={{ title: `#${face}` }} />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: `#${face}`,
        }}
        contentContainerStyle={{
          height: '150%',
        }}
        contentInsetAdjustmentBehavior="automatic">
        <Link
          href="/faces/333"
          style={{
            color: '#fff',
            fontSize: 18,
            padding: 16,
            borderRadius: 8,
            backgroundColor: '#333',
          }}>
          <Link.Trigger>Go to #333</Link.Trigger>
          <Link.Preview />
        </Link>
        <Link
          href="/faces/l1/l2"
          style={{
            color: '#fff',
            fontSize: 18,
            padding: 16,
            borderRadius: 8,
            backgroundColor: '#333',
          }}>
          <Link.Trigger>Go to /faces/l1/l2</Link.Trigger>
          <Link.Preview />
        </Link>
        <Link href="/404" style={{ color: '#fff', fontSize: 18, marginTop: 16 }}>
          Try and go to 404
        </Link>
      </ScrollView>
    </>
  );
}
