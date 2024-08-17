import {
    ReactNode,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef,
  } from "react";
  import {
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetModal,
    BottomSheetBackdrop,
  } from "@gorhom/bottom-sheet";
  import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
  
  interface BottomProp {
    snapPoint: (string | number)[];
    children: ReactNode;
    index?: number;
    handleSheetChanges?: (index: number) => void;
  }
  
  const BottomSheetModalContent = forwardRef<BottomSheetModalMethods, BottomProp>(
    ({ snapPoint, children, index = 0, handleSheetChanges }, ref) => {
      const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  
      useImperativeHandle(ref, () => ({
        present: () => bottomSheetModalRef.current?.present(),
        dismiss: () => bottomSheetModalRef.current?.dismiss(),
        snapToIndex: (index: number) =>
          bottomSheetModalRef.current?.snapToIndex(index),
        snapToPosition: (position: string | number) =>
          bottomSheetModalRef.current?.snapToPosition(position),
        expand: () => bottomSheetModalRef.current?.expand(),
        collapse: () => bottomSheetModalRef.current?.collapse(),
        close: () => bottomSheetModalRef.current?.dismiss(),
        forceClose: () => bottomSheetModalRef.current?.close(),
      }));
  
      const handleSheetChange = useCallback(
        (index: number) => {
          if (handleSheetChanges) {
            handleSheetChanges(index);
          }
        },
        [handleSheetChanges]
      );
  
      const memoizedSnapPoints = useMemo(() => snapPoint, [snapPoint]);
  
      const renderBackdrop = useCallback(
        (props: any) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        ),
        []
      );
  
      return (
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={index}
            snapPoints={memoizedSnapPoints}
            onChange={handleSheetChange}
            handleIndicatorStyle={{ display: "none" }}
            backdropComponent={renderBackdrop}
          >
            <BottomSheetView>{children}</BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      );
    }
  );
  
  export default BottomSheetModalContent;
  