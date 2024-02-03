export type NestedPartial<K> = {
    [attr in keyof K]?: K[attr] extends object
        ? NestedPartial<K[attr]>
        : K[attr] extends object | null
          ? NestedPartial<K[attr]> | null
          : K[attr] extends object | null | undefined
            ? NestedPartial<K[attr]> | null | undefined
            : K[attr];
};
