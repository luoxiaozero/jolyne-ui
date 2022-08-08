import { useTheme } from "../../_mixins/use-theme";
import { h, computed, CSSProperties, defineComponent, ref, watch } from "vue";
import "./styles/index.css";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";

const paginationProps = {
  /**总页数 */
  total: {
    type: Number,
    required: true as true,
  },
  size: {
    type: Number,
    default: 10,
  },
  selectColor: {
    type: String,
    default: "#409eff",
  },
}
export type PaginationProps = ExtractPublicPropTypes<typeof paginationProps>

export default defineComponent({
  name: "Pagination",
  props: paginationProps,
  setup(props, context) {
    const theme = useTheme();
    const total = ref(props.total);
    const size = ref(props.size);
    const pageCount = computed(() => {
      return Math.ceil(total.value / size.value);
    });

    const usePage = ref(1);
    const changPage = (page: number) => {
      if (page > pageCount.value || page < 1) {
        return;
      }
      usePage.value = page;
      context.emit("changePage", usePage.value);
    };

    watch(
      () => props.total,
      (value) => {
        total.value = props.total;
      }
    );
    const inputEnter = (e: KeyboardEvent) => {
      changPage((e.target as HTMLInputElement).value as unknown as number);
    };
    return {
      total,
      pageCount,
      usePage,
      changPage,
      inputEnter,
      cssVars: computed(() => {
        const { backgroundColor } = theme.value.tag;
        return {
          "--select-color": props.selectColor,
          "--background-color": backgroundColor,
        };
      }),
    };
  },
  render() {
    const pageArray: number[] = [];
    for (let i = 1; i <= this.pageCount; i++) {
      pageArray.push(i);
    }
    if (this.pageCount > 1)
      return (
        <div class="jo-pagination" style={this.cssVars as CSSProperties}>
          {this.usePage > 1 ? (
            <span title="首页" onClick={() => this.changPage(1)}>
              &lsaquo;&lsaquo;
            </span>
          ) : null}
          {this.usePage !== 1 ? (
            <span
              title="上一页"
              onClick={() => this.changPage(this.usePage - 1)}
            >
              &lsaquo;
            </span>
          ) : null}
          {pageArray.map((value) => {
            return (
              <span
                onClick={() => this.changPage(value)}
                class={{ "jo-pagination--selected": value == this.usePage }}
              >
                {value}
              </span>
            );
          })}
          {this.usePage !== this.pageCount ? (
            <span
              title="下一页"
              onClick={() => this.changPage(this.usePage + 1)}
            >
              &rsaquo;
            </span>
          ) : null}
          {this.usePage < this.pageCount ? (
            <span title="尾页" onClick={() => this.changPage(this.pageCount)}>
              &rsaquo;&rsaquo;
            </span>
          ) : null}
          <input
            type="number"
            style="width: 42px"
            placeholder={`${this.pageCount}`}
          />
        </div>
      );
  },
});
