<script lang="ts" setup>
import { Photo, PhotoGrid } from "~/app/types/page";

const props = defineProps({
  content: {
    type: Object as PropType<PhotoGrid>,
    required: true,
  },
});

const screen = useScreenDetection();

type GridColumn = {
  width: number;
  photos: Photo[];
};

// calculate grid columns
const gridSections = computed(() => {
  return props.content.sections.map((section) => {
    const columnCount = screen.isMobileScreen.value
      ? section.cols.sm
      : section.cols.lg;
    const columnWidth = 100 / columnCount;
    const columns: Array<GridColumn> = [];

    section.photos.forEach((photo, index) => {
      const columnIndex = index % columnCount;
      if (!columns[columnIndex]) {
        columns[columnIndex] = { width: columnWidth, photos: [] };
      }
      columns[columnIndex].photos.push(photo);
    });

    return columns;
  });
});
</script>

<template>
  <div
    class="photoblockgrid"
    :class="{ 'photoblockgrid--padding': content.padding }"
  >
    <div
      v-for="(section, index) of gridSections"
      :key="index"
      class="photoblockgrid-section"
    >
      <div
        v-for="(column, index1) of section"
        :key="index1"
        class="photoblockgrid-section-column"
        :style="`width:${column.width}%;`"
      >
        <PhotoBlock
          v-for="(photo, index2) of column.photos"
          :key="index2"
          :content="photo"
          class="photoblockgrid-section-photoblock"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.photoblockgrid {
  &--padding {
    margin: -($general__padding--default);
    padding: calc($general__padding--default / 2);

    .photoblockgrid-section-photoblock {
      padding: calc($general__padding--default / 2);
    }
  }
}

.photoblockgrid-section {
  display: flex;
  flex-direction: row;
}

.photoblockgrid-section-column {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
