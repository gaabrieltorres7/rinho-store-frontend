import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore'
import Category from '../types/category.types'
import User from '../types/user.types'

export const categoryConverter = {
  toFirestore(category: Category): DocumentData {
    return { ...category }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Category {
    const { id, displayName, imageUrl, name, products } = snapshot.data(options)

    return {
      id,
      displayName,
      imageUrl,
      name,
      products
    }
  }
}

export const userConverter = {
  toFirestore(user: User): DocumentData {
    return { ...user }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): User {
    const { id, email, firstName, lastName, provider } = snapshot.data(options)

    return {
      id,
      email,
      firstName,
      lastName,
      provider
    }
  }
}
