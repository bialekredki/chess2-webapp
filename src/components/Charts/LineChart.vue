
<script lang="ts">
import { Line, mixins } from 'vue-chartjs'
 
export default {
  extends: Line,
  mixins: [ mixins.reactiveProp ],
  props : ['options', 'chartData'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData, this.options);
  }
}
</script>

