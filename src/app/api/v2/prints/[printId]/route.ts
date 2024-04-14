import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';
import { firestore } from '@/libs/firebase/firebase';

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { printId: string } }
) => {
  if (!params.printId) {
    return NextResponse.json({ error: 'no data' }, { status: 400 });
  }
  // 単体取得
  const docRef = doc(firestore, 'prints', params.printId);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }
  await deleteDoc(docRef);

  return NextResponse.json({}, { status: 200 });
};
